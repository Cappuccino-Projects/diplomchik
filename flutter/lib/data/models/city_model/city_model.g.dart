// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'city_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$CityImpl _$$CityImplFromJson(Map<String, dynamic> json) => _$CityImpl(
      coords: Coords.fromJson(json['coords'] as Map<String, dynamic>),
      district: json['district'] as String,
      name: json['name'] as String,
      population: (json['population'] as num).toInt(),
      subject: json['subject'] as String,
    );

Map<String, dynamic> _$$CityImplToJson(_$CityImpl instance) =>
    <String, dynamic>{
      'coords': instance.coords,
      'district': instance.district,
      'name': instance.name,
      'population': instance.population,
      'subject': instance.subject,
    };
