import 'package:freezed_annotation/freezed_annotation.dart';

import '../coords_model/coords_model.dart';

part 'city_model.freezed.dart';
part 'city_model.g.dart';

@freezed
class City with _$City {
  const factory City({
    required Coords coords,
    required String district,
    required String name,
    required int population,
    required String subject,
  }) = _City;

  factory City.fromJson(Map<String, dynamic> json) => _$CityFromJson(json);
}