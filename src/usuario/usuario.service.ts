import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDto } from './dto/ListaUsuario.dto';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';
import { randomUUID } from 'crypto';
import { AtualizaUsuarioDto } from './dto/AtualizaUsuario.dto';

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

  async criaUsuario(dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.id = randomUUID().toString();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.senha = dadosDoUsuario.senha;

    this.usuarioRepository.save(usuarioEntity);
    return {
      usuario: new ListaUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário criado com sucesso',
    };
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDto) {
    return await this.usuarioRepository.update(id, novosDados);
  }

  async deletaUsuario(id: string) {
    return await this.usuarioRepository.delete(id);
  }
}
