

import 'package:dio/dio.dart';

import '../../domain/repositories/geo_data_repository.dart';

class GeoDataImplements extends GeoDataRepository{

  final Dio dio = Dio();
  
  @override
  Future<String> getCurrentCity(double latitude, double longitude) async {
    String dataCity;
    String url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=$latitude&lon=$longitude';
    Response response = await dio.get(url);
    if (response.statusCode == 200) {
      var data = response.data;
      if (data['address'] != null) {
        String city = data['address']['city'] ?? data['address']['town'] ?? data['address']['village'] ?? 'Unknown';
        dataCity = city;
      } else {
        dataCity = 'Unknown';
      }
    } else {
      dataCity = 'Не удалось определить город';
    }
    return dataCity;
  }

}