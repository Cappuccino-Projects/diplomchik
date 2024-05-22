


import 'package:flutter/material.dart';

import '../../../constants/fonts_and_colors.dart';

Container emailField(TextEditingController controller, String? Function(String?)? validator) {
  return Container(
    height: 45,
    width: double.infinity,
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(10),
      border: Border.all(
        color: Colors.transparent
      ),
      color: Colors.white,
    ),
    child: Align(
      alignment: Alignment.centerLeft,
      child: Padding(
        padding: const EdgeInsets.only(left: 10),
        child: Form(
          autovalidateMode: AutovalidateMode.always,
          child: TextFormField(
            controller: controller,
            style: black(15),
            validator: validator,
            decoration: const InputDecoration(
              border: InputBorder.none,
              isCollapsed: true,
            ),
          ),
        ),
      ),
    ),
  );
}