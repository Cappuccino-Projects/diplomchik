
import 'package:allplaces/data/repositories/hive_implements.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:latlong2/latlong.dart';
import 'package:flutter_map_cancellable_tile_provider/flutter_map_cancellable_tile_provider.dart';

import '../../data/providers/providers.dart';
import '../../data/repositories/map_implements.dart';

class MapScreen extends ConsumerStatefulWidget {
  const MapScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _MapScreenState();
}

class _MapScreenState extends ConsumerState<MapScreen> {

  final MapController _mapController = MapController();

  @override
  void dispose(){
    _mapController.dispose();
    super.dispose();
  }

  Future getHomeCoords() async {
    Map userData = await HiveImplements().getAuthData();
    Map coords = await MapImplements().getHomeCoords(userData['city']);
    return coords;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          mainMap(),
          scaleButtons(context),
          Consumer(
            builder: (context, ref, child) {
              final menuIsOpened = ref.watch(menuBoxProvider);
              return menuPanel(menuIsOpened, ref);
            }
          ),

          Positioned(
            top: 20,
            right: 20,
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.transparent),
                color: Colors.white,
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                child: Row(
                  children: [
                    Image.asset('lib/images/edit.png', scale: 10.0),
                    Padding(
                      padding: const EdgeInsets.only(left: 8),
                      child: Image.asset('lib/images/map.png', scale: 10.0),
                    ),
                  ],
                ),
              ),
            ),
          )
        ],
      ),
    );
  }

  FutureBuilder mainMap() {
    return FutureBuilder(
      future: getHomeCoords(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else {
          final coords = snapshot.data!; 
          return FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter: LatLng(double.parse(coords['lat']), double.parse(coords['lon'])),
              initialZoom: 10.0,
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                tileProvider: CancellableNetworkTileProvider(),
              ),
              const MarkerLayer(
                markers: [
                  Marker(
                    point: LatLng(54.196466, 37.621908),
                    width: 80,
                    height: 80,
                    child: Icon(
                      Icons.location_pin,
                      color: Colors.red,
                      size: 40,
                    ),
                  ),
                ],
              ),
            ],
          );
        }
      }
    );
  }

  Positioned menuPanel(bool menuIsOpened, WidgetRef ref) {
    return Positioned(
      child: SizedBox(
        width: 700,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Flexible(
              child: AnimatedContainer(
                width: menuIsOpened ? 700.0 : 0.0,
                height: double.infinity,
                color: Colors.white,
                duration: const Duration(seconds: 1),
                curve: Curves.easeInOut,
                child: const SizedBox(height: 50, width: 50,),
              ),
            ),
            Flexible(
              child: Padding(
                padding: const EdgeInsets.only(left: 20),
                child: InkWell(
                  onTap: (){ 
                    ref.read(menuBoxProvider.notifier).state = !menuIsOpened;
                  },
                  child: Padding(
                    padding: const EdgeInsets.only(top: 20),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.transparent),
                        color: Colors.white,
                      ),
                      width: 40,
                      height: 40,
                      child: menuIsOpened ? const Icon(Icons.close, size: 25,) : const Icon(Icons.keyboard_double_arrow_right, size: 25,),
                    ),
                  ),
                ),
              ),
            )
          ],
        ),
      )
    );
  }

  Positioned scaleButtons(BuildContext context) {
    return Positioned(
      top: MediaQuery.of(context).size.height / 2,
      right: 20,
      child: Container(
        padding: const EdgeInsets.all(3),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: Colors.transparent
          ),
          color: Colors.white,
        ),
        child: Column(
          children: [
            IconButton(
              splashColor: Colors.transparent,
              highlightColor: Colors.transparent,
              hoverColor: Colors.transparent,
              onPressed: (){
              _mapController.move(
                _mapController.camera.center,
                _mapController.camera.zoom + 1,
              );
              }, 
              icon: const Icon(Icons.add, size: 16,)
            ),
            IconButton(
              splashColor: Colors.transparent,
              highlightColor: Colors.transparent,
              hoverColor: Colors.transparent,
              onPressed: (){
                _mapController.move(
                  _mapController.camera.center,
                  _mapController.camera.zoom - 1,
                );
              }, 
              icon: const Icon(Icons.remove, size: 16,)
            )
          ],
        ),
      ),
    );
  }
}