import 'package:freezed_annotation/freezed_annotation.dart';

part 'coords_model.freezed.dart';
part 'coords_model.g.dart';

@freezed
class Coords with _$Coords {
  const factory Coords({
    required String lat,
    required String lon,
  }) = _Coords;

  factory Coords.fromJson(Map<String, dynamic> json) => _$CoordsFromJson(json);
}