import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

/// Authentication service for Better Auth API integration
/// 
/// This service handles authentication operations by making REST API calls
/// to the backend Better Auth endpoints. It stores session tokens securely
/// using Flutter Secure Storage.
class AuthService {
  /// Base URL of the backend API
  final String baseUrl;
  
  /// HTTP client for making API requests
  final http.Client client;
  
  /// Secure storage for storing authentication tokens
  final FlutterSecureStorage storage;
  
  /// Storage key for session token
  static const String _sessionTokenKey = 'auth_session_token';
  
  /// Storage key for session cookie
  static const String _sessionCookieKey = 'auth_session_cookie';

  AuthService({
    required this.baseUrl,
    http.Client? client,
    FlutterSecureStorage? storage,
  })  : client = client ?? http.Client(),
        storage = storage ?? const FlutterSecureStorage();

  /// Sign in with email and password
  /// 
  /// Returns the session data if successful, null otherwise
  Future<Map<String, dynamic>?> signIn({
    required String email,
    required String password,
  }) async {
    try {
      final response = await client.post(
        Uri.parse('$baseUrl/api/auth/sign-in/email'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        
        // Store session token from response headers or body
        final sessionToken = _extractSessionToken(response);
        if (sessionToken != null) {
          await storage.write(key: _sessionTokenKey, value: sessionToken);
        }
        
        // Store session cookie if present
        final sessionCookie = _extractSessionCookie(response);
        if (sessionCookie != null) {
          await storage.write(key: _sessionCookieKey, value: sessionCookie);
        }
        
        return data;
      }
      
      return null;
    } catch (e) {
      return null;
    }
  }

  /// Sign up with email and password
  /// 
  /// Returns the session data if successful, null otherwise
  Future<Map<String, dynamic>?> signUp({
    required String email,
    required String password,
    String? name,
  }) async {
    try {
      final response = await client.post(
        Uri.parse('$baseUrl/api/auth/sign-up/email'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'email': email,
          'password': password,
          if (name != null) 'name': name,
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        
        // Store session token from response
        final sessionToken = _extractSessionToken(response);
        if (sessionToken != null) {
          await storage.write(key: _sessionTokenKey, value: sessionToken);
        }
        
        final sessionCookie = _extractSessionCookie(response);
        if (sessionCookie != null) {
          await storage.write(key: _sessionCookieKey, value: sessionCookie);
        }
        
        return data;
      }
      
      return null;
    } catch (e) {
      return null;
    }
  }

  /// Get current session
  /// 
  /// Returns the current user session if authenticated, null otherwise
  Future<Map<String, dynamic>?> getSession() async {
    try {
      final sessionToken = await storage.read(key: _sessionTokenKey);
      final sessionCookie = await storage.read(key: _sessionCookieKey);
      
      if (sessionToken == null && sessionCookie == null) {
        return null;
      }

      final headers = <String, String>{
        'Content-Type': 'application/json',
      };
      
      if (sessionCookie != null) {
        headers['Cookie'] = sessionCookie;
      } else if (sessionToken != null) {
        headers['Authorization'] = 'Bearer $sessionToken';
      }

      final response = await client.get(
        Uri.parse('$baseUrl/api/auth/session'),
        headers: headers,
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body) as Map<String, dynamic>;
      }
      
      // If session is invalid, clear stored tokens
      if (response.statusCode == 401) {
        await signOut();
      }
      
      return null;
    } catch (e) {
      return null;
    }
  }

  /// Sign out the current user
  /// 
  /// Clears the session and removes stored tokens
  Future<void> signOut() async {
    try {
      final sessionToken = await storage.read(key: _sessionTokenKey);
      final sessionCookie = await storage.read(key: _sessionCookieKey);
      
      final headers = <String, String>{
        'Content-Type': 'application/json',
      };
      
      if (sessionCookie != null) {
        headers['Cookie'] = sessionCookie;
      } else if (sessionToken != null) {
        headers['Authorization'] = 'Bearer $sessionToken';
      }

      await client.post(
        Uri.parse('$baseUrl/api/auth/sign-out'),
        headers: headers,
      );
    } catch (e) {
      // Ignore errors during sign out
    } finally {
      // Always clear stored tokens
      await storage.delete(key: _sessionTokenKey);
      await storage.delete(key: _sessionCookieKey);
    }
  }

  /// Check if user is currently authenticated
  /// 
  /// Returns true if a valid session exists, false otherwise
  Future<bool> isAuthenticated() async {
    final session = await getSession();
    return session != null && session['user'] != null;
  }

  /// Extract session token from response headers or body
  String? _extractSessionToken(http.Response response) {
    // Check for token in Set-Cookie header
    final setCookie = response.headers['set-cookie'];
    if (setCookie != null) {
      // Extract better-auth.session_token from cookie
      final match = RegExp(r'better-auth\.session_token=([^;]+)').firstMatch(setCookie);
      if (match != null) {
        return match.group(1);
      }
    }
    
    // Check for token in response body
    try {
      final data = jsonDecode(response.body) as Map<String, dynamic>?;
      return data?['token'] as String?;
    } catch (e) {
      return null;
    }
  }

  /// Extract session cookie from response headers
  String? _extractSessionCookie(http.Response response) {
    final setCookie = response.headers['set-cookie'];
    if (setCookie != null) {
      // Extract the full cookie string
      return setCookie.split(';').first;
    }
    return null;
  }

  /// Dispose resources
  void dispose() {
    client.close();
  }
}
