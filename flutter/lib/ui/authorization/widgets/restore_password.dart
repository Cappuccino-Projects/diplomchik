import 'package:flutter/material.dart';

import '../../../constants/fonts_and_colors.dart';
import '../../../data/repositories/authorization_implements.dart';
import 'email_field.dart';

Future<String?> showInputDialog(BuildContext context, TextEditingController controller) {
  
  AuthorizationImplements auth = AuthorizationImplements();

  return showDialog(
    context: context,
    builder: (context) {
      return Align(
        alignment: AlignmentDirectional.center,
        child: SingleChildScrollView(
          physics: const NeverScrollableScrollPhysics(),
          child: AlertDialog(
            insetPadding: const EdgeInsets.all(10),
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(15),
              ),
            ),
            title: Text('Введите email:', style: black(16),),
            content: SizedBox(
              width: 300, 
              child: emailField(controller, auth.validateEmail)
            ),
            actions: <Widget>[
              Padding(
                padding: const EdgeInsets.only(right: 10),
                child: InkWell(
                  onTap: (){ 
                    Navigator.pop(context, null);
                  },
                  child: Text('отмена', style: black(15),)
                ),
              ),
              InkWell(
                onTap: () async { 
                  String enteredText = controller.text;
                  Navigator.pop(context, enteredText);
                },
                child: Text('восстановить', style: black(15),)
              ),
            ],
          ),
        ),
      );
    },
  ).then((value) => value);
}