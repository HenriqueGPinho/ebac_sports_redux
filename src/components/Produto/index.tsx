import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { adicionar } from '../../store/reducers/carrinho'
import { favoritar } from '../../store/reducers/favoritar'
import { Produto as ProdutoType } from '../../App'

import * as S from './styles'

type Props = {
  produto: ProdutoType
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useDispatch()

  const [adicionadoAoCarrinho, setAdicionadoAoCarrinho] = useState(false)
  const [adicionadoAosFavoritos, setAdicionadoAosFavoritos] = useState(false)

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar
        onClick={() => {
          dispatch(favoritar(produto))
          setAdicionadoAosFavoritos(!adicionadoAosFavoritos)
        }}
        type="button"
      >
        {adicionadoAosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar
        onClick={() => {
          dispatch(adicionar(produto))
          setAdicionadoAoCarrinho(!adicionadoAoCarrinho)
        }}
        type="button"
      >
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
