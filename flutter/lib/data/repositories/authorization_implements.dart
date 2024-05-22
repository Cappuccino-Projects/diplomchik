
import '../../domain/repositories/authorization_repository.dart';
import 'hive_implements.dart';

class AuthorizationImplements extends AuthorizationRepository{
  
  @override
  String? validateEmail(String? value) {
    const pattern = r"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'"
      r'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-'
      r'\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*'
      r'[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4]'
      r'[0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9]'
      r'[0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\'
      r'x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])';
    final regex = RegExp(pattern);
    return value!.isNotEmpty && !regex.hasMatch(value)
      ? 'введите действительный email адрес'
      : null;
  }

  @override
  Future<String> restorePassword(String email) async {
    // pull the API to get the answer send message on email or email does not exist
    String? responce;
    await Future.delayed(const Duration(seconds: 3));
    responce = 'ссылка на восстановление отправлена на указанную почту';
    return responce;
  }
  
  @override
  Future<String> newRegistration(Map regData) async {
    // pull the API to get the answer
    HiveImplements().saveAuthData(regData);
    String? responce;
    await Future.delayed(const Duration(seconds: 3));
    responce = 'успешная регистрация, зайдите с логином и паролем';

    // заглушка внутрення БД

    return responce;
  }
  
  @override
  Future<String> auth(Map authData) async {
    // pull the API to get the answer
    String? responce;
    Map hiveAuthData = await HiveImplements().getAuthData();
    if (authData['email'] == hiveAuthData['email'] && authData['pass'] == hiveAuthData['pass']) {
      responce =  'veri';
    } else {
      responce =  'rejected';
    }
    await Future.delayed(const Duration(seconds: 3));
    return responce;
  }
  
  
  
  

}