import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { CriaProdutoDto } from './dto/CriaProduto.dto';
import { randomUUID } from 'crypto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosProduto: CriaProdutoDto) {
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = dadosProduto.usuarioId;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    // produto.caracteristicas = dadosProduto.caracteristicas;
    // produto.imagens = dadosProduto.imagens;
    return await this.produtoRepository.save(produto);
  }

  async listaTodos() {
    return await this.produtoRepository.find();
  }

  async remove(id: string) {
    await this.produtoRepository.delete(id);
    return id;
  }

  async atualiza(id: string, dadosProduto: AtualizaProdutoDTO) {
    return await this.produtoRepository.update(id, dadosProduto);
  }
}
