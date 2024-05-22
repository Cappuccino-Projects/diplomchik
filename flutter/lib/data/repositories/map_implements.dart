

import 'dart:convert';

import 'package:flutter/services.dart';

import '../../domain/repositories/map_repository.dart';

class MapImplements extends MapRepository{
  
  @override
  Future<Map> getHomeCoords(String homeCity) async {
    Map coords = {};
    final jsonString = await rootBundle.loadString('lib/constants/cities.json');
    final List<dynamic> jsonList = json.decode(jsonString);
    for (var city in jsonList) {
      if (city['name'] == homeCity) {
        coords = city['coords'];
      }
    }
    return coords;
  }

}