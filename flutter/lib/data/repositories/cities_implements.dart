

import 'dart:convert';

import 'package:allplaces/data/models/city_model/city_model.dart';
import 'package:flutter/services.dart';

import '../../domain/repositories/cities_repository.dart';

class CitiesImplements extends CitiesRepository{
  
  @override
  Future<List<City>> loadCities() async {
    final jsonString = await rootBundle.loadString('lib/constants/cities.json');
    final List<dynamic> jsonList = json.decode(jsonString);
    return jsonList.map((json) => City.fromJson(json)).toList();
  }

}