// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'coords_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

Coords _$CoordsFromJson(Map<String, dynamic> json) {
  return _Coords.fromJson(json);
}

/// @nodoc
mixin _$Coords {
  String get lat => throw _privateConstructorUsedError;
  String get lon => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $CoordsCopyWith<Coords> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CoordsCopyWith<$Res> {
  factory $CoordsCopyWith(Coords value, $Res Function(Coords) then) =
      _$CoordsCopyWithImpl<$Res, Coords>;
  @useResult
  $Res call({String lat, String lon});
}

/// @nodoc
class _$CoordsCopyWithImpl<$Res, $Val extends Coords>
    implements $CoordsCopyWith<$Res> {
  _$CoordsCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? lat = null,
    Object? lon = null,
  }) {
    return _then(_value.copyWith(
      lat: null == lat
          ? _value.lat
          : lat // ignore: cast_nullable_to_non_nullable
              as String,
      lon: null == lon
          ? _value.lon
          : lon // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CoordsImplCopyWith<$Res> implements $CoordsCopyWith<$Res> {
  factory _$$CoordsImplCopyWith(
          _$CoordsImpl value, $Res Function(_$CoordsImpl) then) =
      __$$CoordsImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String lat, String lon});
}

/// @nodoc
class __$$CoordsImplCopyWithImpl<$Res>
    extends _$CoordsCopyWithImpl<$Res, _$CoordsImpl>
    implements _$$CoordsImplCopyWith<$Res> {
  __$$CoordsImplCopyWithImpl(
      _$CoordsImpl _value, $Res Function(_$CoordsImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? lat = null,
    Object? lon = null,
  }) {
    return _then(_$CoordsImpl(
      lat: null == lat
          ? _value.lat
          : lat // ignore: cast_nullable_to_non_nullable
              as String,
      lon: null == lon
          ? _value.lon
          : lon // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$CoordsImpl implements _Coords {
  const _$CoordsImpl({required this.lat, required this.lon});

  factory _$CoordsImpl.fromJson(Map<String, dynamic> json) =>
      _$$CoordsImplFromJson(json);

  @override
  final String lat;
  @override
  final String lon;

  @override
  String toString() {
    return 'Coords(lat: $lat, lon: $lon)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CoordsImpl &&
            (identical(other.lat, lat) || other.lat == lat) &&
            (identical(other.lon, lon) || other.lon == lon));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, lat, lon);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$CoordsImplCopyWith<_$CoordsImpl> get copyWith =>
      __$$CoordsImplCopyWithImpl<_$CoordsImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CoordsImplToJson(
      this,
    );
  }
}

abstract class _Coords implements Coords {
  const factory _Coords(
      {required final String lat, required final String lon}) = _$CoordsImpl;

  factory _Coords.fromJson(Map<String, dynamic> json) = _$CoordsImpl.fromJson;

  @override
  String get lat;
  @override
  String get lon;
  @override
  @JsonKey(ignore: true)
  _$$CoordsImplCopyWith<_$CoordsImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
