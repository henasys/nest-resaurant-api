import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      "permissions",
      context.getHandler()
    );
    // console.log("routePermissions", routePermissions);
    // console.log("user", context.getArgs()[0].user);

    const userPermissions = context.getArgs()[0].user.permissions;
    console.log("userPermissions", userPermissions);

    if (!routePermissions) {
      return true;
    }

    const hasPermission = () =>
      routePermissions.every(
        (routePermission) =>
          userPermissions && userPermissions.includes(routePermission)
      );

    return hasPermission();
  }
}
