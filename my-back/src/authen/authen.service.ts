import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpAuthenDto } from './dto/sign-up-authen.dto';
import { LoginAuthenDto } from './dto/login-authen.dto';
import * as bcrypt from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    //private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpAuthenDto: SignUpAuthenDto) {
    var signUpUser = new SignUpAuthenDto;
    signUpUser.userName = signUpAuthenDto.userName;
    
    const salt = await bcrypt.genSalt(10);
    signUpUser.password = await bcrypt.hash(signUpAuthenDto.password,salt);
    signUpUser.created = signUpAuthenDto.created;
    signUpUser.modified = signUpAuthenDto.modified;
    const user = await this.userRepository.create(signUpUser);
    //const token = this.jwtService.sign({id: user.id});
    return await this.userRepository.save(user)
  }

  async login(loginAuthenDto: LoginAuthenDto) {
    const {userName,password} = loginAuthenDto;
    const user = await this.userRepository.findOne({
      where: { userName },
    });
    if(!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordMatched = await bcrypt.compare(password,user.password);
    if(!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }
    //const token = this.jwtService.sign({id: user.id});
    return user;
  }
}