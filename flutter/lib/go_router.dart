import 'package:go_router/go_router.dart';

import 'constants/routers.dart';
import 'ui/map_screen/map_screen.dart';
import 'ui/authorization/authentication.dart';
import 'ui/authorization/registration.dart';

GoRouter goRouter(bool auth) {
  return GoRouter(
    initialLocation: auth ? map : authentication,
    routes: <RouteBase>[
      GoRoute(
        path: authentication,
        builder: ((context, state) => const Authentication()),
      ),
      GoRoute(
        path: registration,
        builder: ((context, state) => const Registration()),
      ),
      GoRoute(
        path: map,
        builder: ((context, state) => const MapScreen()),
      ),
    ]
  );
}