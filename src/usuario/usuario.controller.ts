import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { randomUUID } from 'crypto';
import { ListaUsuarioDto } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDto } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.id = randomUUID().toString();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.senha = dadosDoUsuario.senha;

    this.usuarioRepository.salvar(usuarioEntity);
    return {
      usuario: new ListaUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDto(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDto,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      message: 'Usuário atualizado com sucesso',
    };
  }
}
