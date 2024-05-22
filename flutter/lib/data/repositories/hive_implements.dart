






import 'package:hive_flutter/hive_flutter.dart';

import '../../domain/repositories/hive_repository.dart';

class HiveImplements extends HiveRepository{

  final Box hive = Hive.box('hiveStorage');

  @override
  Future<void> saveAuthData(Map authData) async {
    await hive.put('authData', authData);
  }

  @override
  Future<Map> getAuthData() async {
    Map authData = await hive.get('authData', defaultValue: {});
    return authData;
  }


}