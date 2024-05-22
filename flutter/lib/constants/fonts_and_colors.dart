import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

const Color bgColor = Color(0xFFF8F8F8); // background color
const Color greenColor = Color(0xFFCAF05F); // center color
const Color blackColor = Color(0xFF212121); // icons, texts
const Color drawerColor = Color(0xFFF9F9F9); // drawer
const Color textFieldsColor = Color(0xFFF3F3F3); // darwer text fields color

// font onest
TextStyle black(double size, [FontWeight weight = FontWeight.normal]) => GoogleFonts.onest(color: Colors.black, fontSize: size, fontWeight: weight);
TextStyle blackUnderline(double size, [FontWeight weight = FontWeight.normal]) => GoogleFonts.onest(color: Colors.black, fontSize: size, fontWeight: weight, decoration: TextDecoration.underline,);
TextStyle grey(double size, [FontWeight weight = FontWeight.normal]) => GoogleFonts.onest(color: Colors.grey, fontSize: size, fontWeight: weight);
