

import 'package:flutter/material.dart';

import '../../../constants/fonts_and_colors.dart';

Container inputFields(TextEditingController controller, [bool obscure = false]) {
  return Container(
    height: 45,
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(10),
      border: Border.all(color: Colors.transparent),
      color: Colors.white,
    ),
    child: Align(
      alignment: Alignment.centerLeft,
      child: Padding(
        padding: const EdgeInsets.only(left: 10),
        child: TextFormField(
          obscureText: obscure,
          controller: controller,
          style: black(15),
          decoration: const InputDecoration(
            border: InputBorder.none,
            isCollapsed: true,
          ),
        ),
      ),
    ),
  );
}