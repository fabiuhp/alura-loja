import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailUnico } from '../validation/email-unico.validator';

export class AtualizaUsuarioDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'E-mail inválido' })
  @EmailUnico({ message: 'E-mail já cadastrado' })
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  senha: string;
}
