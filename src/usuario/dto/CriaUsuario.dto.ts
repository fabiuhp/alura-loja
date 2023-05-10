import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailUnico } from '../validation/email-unico.validator';

export class CriaUsuarioDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'E-mail inválido' })
  @EmailUnico({ message: 'E-mail já cadastrado' })
  @IsNotEmpty()
  email: string;

  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha: string;
}
