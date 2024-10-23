'use client'

import Pagina from '@/components/Pagina'
import { Table } from 'react-bootstrap'
import { useEffect, useState } from 'react'

export default function Page() {
    const [imoveis, setImoveis] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedImoveis = JSON.parse(localStorage.getItem('imoveis')) || [];
            setImoveis(storedImoveis);
        }
    }, []);

    return (
        <Pagina titulo={"Lista de Imóveis"}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tipo de Imóvel</th>
                        <th>Finalidade</th>
                        <th>Valor</th>
                        <th>Área (m²)</th>
                        <th>Quartos</th>
                        <th>Descrição</th>
                        <th>Vagas na Garagem</th>
                        <th>Local</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {imoveis.length > 0 ? (
                        imoveis.map((item, index) => (
                            <tr key={index}>
                                <td>{item.tipo}</td>
                                <td>{item.finalidade}</td>
                                <td>{item.valor}</td>
                                <td>{item.area}</td>
                                <td>{item.quartos}</td>
                                <td>{item.descricao}</td>
                                <td>{item.vagasGaragem}</td>
                                <td>{item.endereco.logradouro}, {item.endereco.numero} - {item.endereco.bairro}, {item.endereco.cidade} - {item.endereco.uf}</td>
                                <td>
                                    {item.foto && <img src={item.foto} alt="Imagem do Imóvel" width={280} />}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">Nenhum imóvel cadastrado.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Pagina>
    )
}