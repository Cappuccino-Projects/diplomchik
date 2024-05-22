
abstract class HiveRepository{

  Future<void> saveAuthData(Map authData);

  Future<Map> getAuthData();

}