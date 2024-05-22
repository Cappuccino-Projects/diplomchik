

import 'package:geolocator/geolocator.dart';

import '../../domain/repositories/geo_position_repository.dart';
import 'geo_data_implements.dart';

class GeoPositionEmplements extends GeoPositionRepository{
  
  
  
  @override
  Future<String> getCity() async {
    bool serviceEnabled;
    LocationPermission permission;

    String currentAddress = 'Определяем город...';

    try {
      serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        currentAddress = 'Служба определения местоположения отключена';
      }

      permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          currentAddress = 'Нет разрешения на определение местоположения';
        }
      }

      if (permission == LocationPermission.deniedForever) {
        currentAddress = 'Разрешения на определение местоположения навсегда запрещены';
      }

      Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);

      currentAddress = await GeoDataImplements().getCurrentCity(position.latitude, position.longitude);
    
    } catch (e) {
      currentAddress = 'Error: $e';
    }
    return currentAddress;
  }
    
    



}