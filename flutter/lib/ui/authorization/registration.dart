
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_progress_hud/flutter_progress_hud.dart';

import '../../constants/fonts_and_colors.dart';
import '../../constants/routers.dart';
import '../../data/models/city_model/city_model.dart';
import '../../data/repositories/cities_implements.dart';
import '../../data/repositories/geo_position_implements.dart';
import '../../data/repositories/authorization_implements.dart';
import 'widgets/description.dart';
import 'widgets/cities_dropdown.dart';
import 'widgets/email_field.dart';
import 'widgets/input_fields.dart';





class Registration extends StatefulWidget {
  const Registration({super.key});

  @override
  State<Registration> createState() => _RegistrationState();
}

class _RegistrationState extends State<Registration> {

  AuthorizationImplements auth = AuthorizationImplements();
  TextEditingController nameController = TextEditingController();
  TextEditingController loginController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passController = TextEditingController();
  TextEditingController passConfirmController = TextEditingController();
  TextEditingController cityController = TextEditingController();
  List<City> cities = [];


  @override
  void initState(){
    GeoPositionEmplements().getCity().then((value) {
      setState(() {
        cityController.text = value;
      });
    });
    CitiesImplements().loadCities().then((value) {
      setState(() {
        cities = value;
      });
    });
    super.initState();
  }

  @override
  void dispose(){
    nameController.dispose();
    loginController.dispose();
    emailController.dispose();
    passController.dispose();
    passConfirmController.dispose();
    cityController.dispose();
    super.dispose();
  }


  Future<void> createAccount(ScaffoldMessengerState messenger) async {
    Map accountData = {};
    if (nameController.text.isNotEmpty &&
      loginController.text.isNotEmpty &&
      emailController.text.isNotEmpty &&
      passController.text.isNotEmpty &&
      passConfirmController.text.isNotEmpty &&
      cityController.text.isNotEmpty){
        String? validate = auth.validateEmail(emailController.text);
        if(validate == null){
          if(passController.text == passConfirmController.text){
            accountData['name'] = nameController.text;
            accountData['login'] = loginController.text;
            accountData['email'] = emailController.text;
            accountData['pass'] = passController.text;
            accountData['city'] = cityController.text;
            await AuthorizationImplements().newRegistration(accountData).then((value) {
              messenger._toast(value);
              context.go(authentication);
            });
          } else {
            messenger._toast('пароли не совпадают');
          }
        } else {
          messenger._toast('введите действительный email адрес');
        }
      } else {
        messenger._toast('не все поля заполнены');
      }
  }


  @override
  Widget build(BuildContext context) {

    final messenger = ScaffoldMessenger.of(context);

    return PopScope(
      canPop: false,
      child: Scaffold(
        backgroundColor: bgColor,
        body: ProgressHUD(
          barrierColor: Colors.white.withOpacity(0.7),
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 30),
          child: LayoutBuilder(
            builder: (context, constraints) {
              return Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    constraints.maxWidth < 850 ? const SizedBox.shrink() :
                    const Description(),
                    Flexible(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 15),
                        child: SizedBox(
                          width: 600,
                          child: Padding(
                            padding: const EdgeInsets.only(left: 20, right: 20),
                            child: SingleChildScrollView(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(bottom: 10, left: 10),
                                    child: Align(alignment: Alignment.centerLeft, child: Text('Имя', style: black(16),)),
                                  ),
                                  inputFields(nameController),
                                  Padding(
                                    padding: const EdgeInsets.only(bottom: 10, left: 10, top: 15),
                                    child: Align(alignment: Alignment.centerLeft, child: Text('Логин', style: black(16),)),
                                  ),
                                  inputFields(loginController),
                                  Padding(
                                    padding: const EdgeInsets.only(bottom: 10, left: 10, top: 15),
                                    child: Align(alignment: Alignment.centerLeft, child: Text('Электронная почта', style: black(16),)),
                                  ),
                                  emailField(emailController, auth.validateEmail),
                                  Padding(
                                    padding: const EdgeInsets.only(bottom: 10, left: 10, top: 15),
                                    child: Align(alignment: Alignment.centerLeft, child: Text('Пароль', style: black(16),)),
                                  ),
                                  inputFields(passController, true),
                                  Padding(
                                    padding: const EdgeInsets.only(bottom: 10, left: 10, top: 15),
                                    child: Align(alignment: Alignment.centerLeft, child: Text('Подтверждение пароля', style: black(16),)),
                                  ),
                                  inputFields(passConfirmController, true),
                                  Padding(
                                    padding: const EdgeInsets.only(bottom: 10, left: 10, top: 15),
                                    child: Align(alignment: Alignment.centerLeft, child: Text('Город', style: black(16),)),
                                  ),
                                  CitiesDropdown(cities: cities, controller: cityController,),
                                  Padding(
                                    padding: const EdgeInsets.only(top: 25),
                                    child: SizedBox(
                                      width: double.infinity,
                                      height: 45,
                                      child: ElevatedButton(
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor: greenColor,
                                          foregroundColor: Colors.white,
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(10),
                                          ),
                                        ),
                                        onPressed: () async { 
                                          final progress = ProgressHUD.of(context);
                                          progress?.showWithText('создаем...');
                                          await createAccount(messenger).whenComplete(() => progress?.dismiss()); 
                                        }, 
                                        child: Text('Создать аккаунт', style: black(16),)
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 15,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text('Уже есть аккаунт?', style: black(15),),
                                      const SizedBox(width: 5,),
                                      InkWell(
                                        onTap: (){ context.go(authentication); },
                                        child: Text('Войти', style: blackUnderline(15))
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }
          ),
        ),
      ),
    );
  }

}

extension on ScaffoldMessengerState {
  void _toast(String message){
    showSnackBar(
      SnackBar(
        content: Text(message), 
        duration: const Duration(seconds: 4),
      )
    );
  }
}