



import '../../data/models/city_model/city_model.dart';

abstract class CitiesRepository{

  Future<List<City>> loadCities();

}