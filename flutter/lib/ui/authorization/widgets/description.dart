
import 'package:flutter/material.dart';

import '../../../constants/fonts_and_colors.dart';
import '../../../constants/texts.dart';

class Description extends StatelessWidget {
  const Description({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: Padding(
        padding: const EdgeInsets.all(30),
        child: Container(
          width: 600,
          decoration: BoxDecoration(
            color: greenColor,
            borderRadius: BorderRadius.circular(15),
          ),
          child: SingleChildScrollView(
            physics: const NeverScrollableScrollPhysics(),
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 40, bottom: 50),
                  child: Text('Регистрация во ВсеМеста', style: black(24),),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 70),
                  child: Align(alignment: Alignment.centerLeft, child: Text(regDescriptions, style: black(18),)),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 60, top: 60),
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: SizedBox(
                      width: 64,
                      height: 64,
                      child: Image.asset('lib/images/sun.png', scale: 15.0),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 70, bottom: 40, top: 200),
                  child: Align(alignment: Alignment.centerRight, child: Text(regMotivation, style: black(18),)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}