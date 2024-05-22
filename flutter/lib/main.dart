import 'package:allplaces/data/repositories/hive_implements.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:flutter_web_plugins/url_strategy.dart';
import 'package:hive_flutter/hive_flutter.dart';

import 'all_places_app.dart';

void main() async {
  setUrlStrategy(null);
  await Hive.initFlutter();
  await Hive.openBox('hiveStorage');
  Map authData = await HiveImplements().getAuthData();
  bool auth = authData.isEmpty ? false : true; 
  runApp(ProviderScope(child: AllPlacesApp(auth: auth,)));
}
