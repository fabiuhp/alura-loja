import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDto } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { ProdutoRepository } from './produto.repository';
import { ProductService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly produtoService: ProductService,
  ) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDto) {
    const produtoCadastrado = this.produtoService.criaProduto(dadosProduto);
    return produtoCadastrado;
  }

  @Get()
  async listaTodos() {
    return this.produtoService.listaTodos();
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualiza(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido: string = await this.produtoService.remove(id);

    return {
      mensagem: 'produto removido com sucesso',
      idProduto: produtoRemovido,
    };
  }
}
