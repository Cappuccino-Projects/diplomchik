
import 'package:flutter/material.dart';
import 'package:flutter_progress_hud/flutter_progress_hud.dart';
import 'package:go_router/go_router.dart';

import '../../constants/fonts_and_colors.dart';
import '../../constants/routers.dart';
import '../../data/repositories/authorization_implements.dart';
import 'widgets/description.dart';
import 'widgets/email_field.dart';
import 'widgets/input_fields.dart';
import 'widgets/restore_password.dart';

// TestUser
// test_user
// test_user@gmail.com
// 2222


class Authentication extends StatefulWidget {
  const Authentication({super.key});

  @override
  State<Authentication> createState() => _AuthenticationState();
}

class _AuthenticationState extends State<Authentication> {

  AuthorizationImplements auth = AuthorizationImplements();
  TextEditingController emailController = TextEditingController();
  TextEditingController passController = TextEditingController();
  TextEditingController restoreEmailController = TextEditingController();


  @override
  void dispose(){
    emailController.dispose();
    passController.dispose();
    restoreEmailController.dispose();
    super.dispose();
  }


  Future<void> authAccount(ScaffoldMessengerState messenger) async {
    Map authData = {};
    if (emailController.text.isNotEmpty && passController.text.isNotEmpty){
        String? validate = auth.validateEmail(emailController.text);
        if(validate == null){
          authData['email'] = emailController.text;
          authData['pass'] = passController.text;
          await AuthorizationImplements().auth(authData).then((value) {
            value == 'veri' ? 
            context.go(map) : messenger._toast('не правильный логин или пароль');
          });
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
                                    child: Align(alignment: Alignment.centerLeft, child: Text('Электронная почта', style: black(16),)),
                                  ),
                                  emailField(emailController, auth.validateEmail),
                                  Padding(
                                    padding: const EdgeInsets.only(bottom: 10, left: 10, top: 15),
                                    child: Align(alignment: Alignment.centerLeft, child: Text('Пароль', style: black(16),)),
                                  ),
                                  inputFields(passController, true),
                                  Padding(
                                    padding: const EdgeInsets.only(bottom: 10, right: 10, top: 15),
                                    child: Align(
                                      alignment: Alignment.centerRight,
                                      child: InkWell(
                                        onTap: () {
                                          final progress = ProgressHUD.of(context);
                                          showInputDialog(context, restoreEmailController).then((result) async {
                                            result != null && result.isNotEmpty ? 
                                            {
                                              progress?.showWithText('восстанавливаем...'),
                                              await auth.restorePassword(result).then((value) {
                                                progress?.dismiss();
                                                messenger._toast(value);
                                                setState(() {
                                                  restoreEmailController.clear();
                                                });
                                              })
                                            } : null;
                                          }); 
                                        },
                                        child: Text('Забыл? Помочь?', style: black(15),)
                                      )
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(top: 30),
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
                                          progress?.showWithText('входим...');
                                          await authAccount(messenger).whenComplete(() => progress?.dismiss());
                                        }, 
                                        child: Text('Войти в аккаунт', style: black(16),)
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 20,),
                                  InkWell(
                                    onTap: (){ 
                                      context.go(registration);
                                    },
                                    child: Text('Ещё нет аккаунта?', style: blackUnderline(15))
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    )
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