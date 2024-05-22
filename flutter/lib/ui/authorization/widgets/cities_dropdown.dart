import 'package:flutter/material.dart';

import '../../../data/models/city_model/city_model.dart';

class CitiesDropdown extends StatefulWidget {
  final List<City> cities;
  final TextEditingController controller;
  const CitiesDropdown({super.key, required this.cities, required this.controller});

  @override
  CitiesDropdownState createState() => CitiesDropdownState();
}

class CitiesDropdownState extends State<CitiesDropdown> {
  
  final LayerLink _layerLink = LayerLink();
  OverlayEntry? _overlayEntry;
  List<City> _filteredCities = [];

  @override
  void initState() {
    super.initState();
    _filteredCities = widget.cities;
  }

  void _filterCities(String query) {
    final filtered = widget.cities.where((city) {
      final cityNameLower = city.name.toLowerCase();
      final queryLower = query.toLowerCase();

      return cityNameLower.contains(queryLower);
    }).toList();

    setState(() {
      _filteredCities = filtered;
    });
  }

  OverlayEntry _createOverlayEntry() {
    return OverlayEntry(
      builder: (context) {
        const int maxItemsToShow = 4;
        final itemsToShow = _filteredCities.take(maxItemsToShow).toList();
        return Positioned(
          width: MediaQuery.of(context).size.width < 850 ? MediaQuery.of(context).size.width - 45 : 555,
          child: CompositedTransformFollower(
            link: _layerLink,
            showWhenUnlinked: false,
            offset: const Offset(2, 45),
            child: Material(
              elevation: 4.0,
              child: SizedBox(
                width: 600,
                child: ListView(
                  padding: EdgeInsets.zero,
                  shrinkWrap: true,
                  children: itemsToShow
                      .map((city) => ListTile(
                          title: Text(city.name),
                          onTap: () {
                            widget.controller.text = city.name;
                            _hideOverlay();
                          },
                        ))
                      .toList(),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  void _showOverlay() {
    if (_overlayEntry == null) {
      _overlayEntry = _createOverlayEntry();
      Overlay.of(context).insert(_overlayEntry!);
    } else {
      _overlayEntry!.markNeedsBuild();
    }
  }

  void _hideOverlay() {
    _overlayEntry?.remove();
    _overlayEntry = null;
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return GestureDetector(
          onTap: () {
            _hideOverlay();
            FocusScope.of(context).requestFocus(FocusNode());
          },
          child: CompositedTransformTarget(
            link: _layerLink,
            child: Column(
              children: [
                Container(
                  height: 45,
                  width: 600,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                      color: Colors.transparent
                    ),
                    color: Colors.white,
                  ),
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 10),
                      child: TextFormField(
                        controller: widget.controller,
                        decoration: const InputDecoration(
                          border: InputBorder.none,
                          isCollapsed: true,
                        ),
                        onChanged: (value) {
                          _filterCities(value);
                          _showOverlay();
                        },
                        onTap: _showOverlay,
                        onEditingComplete: _hideOverlay,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      }
    );
  }

  @override
  void dispose() {
    _overlayEntry?.dispose();
    super.dispose();
  }
}
