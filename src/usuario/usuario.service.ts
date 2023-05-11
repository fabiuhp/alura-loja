import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDto } from './dto/ListaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map((usuario) => {
      return new ListaUsuarioDto(usuario.id, usuario.nome);
    });
    return usuariosLista;
  }
}
