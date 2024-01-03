import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { UpdateStateDTO } from './dto/update-state.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/profile')
  updateProfile(
    @Req() request: Request,
    @Body() updateProfileDTO: UpdateProfileDTO,
  ) {
    return this.userService.updateProfile(request, updateProfileDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/profile/state')
  updateUserState(
    @Req() request: Request,
    @Body() updateStateDTO: UpdateStateDTO,
  ) {
    return this.userService.updateUserState(request, updateStateDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() request: Request) {
    return this.userService.getProfile(request);
  }
}
