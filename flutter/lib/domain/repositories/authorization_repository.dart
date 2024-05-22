


abstract class AuthorizationRepository{

  Future<String> newRegistration(Map regData);

  Future<String> auth(Map authData);

  Future<String> restorePassword(String email);

  String? validateEmail(String? value);

}