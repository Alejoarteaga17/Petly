import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
    getProfile(req: any): any;
}
