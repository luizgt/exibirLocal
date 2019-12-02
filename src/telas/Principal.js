import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Principal extends Component{

    state={
        latitude: 0,
        longitude: 0,
        acuracia: 0,
        altitude: 0,
    }

    async componentDidMount(){
        this.pegarLocalizacao;      // enquanto a localização for atualizada atualiza a renderizacao
    }

    // geolocation.watchPosition(success, [error], [options]);

    pegarLocalizacao = () => {       //busca as coordenadas para atualizar a posicao dos pontos
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                posAuxiliar = JSON.stringify(pos);
                posAuxiliar = JSON.parse(posAuxiliar);

                this.setState({
                    latitude: posAuxiliar.coords.latitude,
                    longitude: posAuxiliar.coords.longitude,
                    acuracia: posAuxiliar.coords.accuracy,
                    altitude: posAuxiliar.coords.altitude,
                    error: null
                });
            },
            (error) => this.setState({ erro: error.message }),
            {   enableHighAccuracy: false,    //alta precisao
                timeout: 20000,             //tempo para executar antes de retornar erro
                maximumAge: 1000 },         //tempo permitido de cache do dispositivo
        )
    }

    render(){
        // this.pegarLocalizacao;
        return(
            <View>
                <Text>Latitude: </Text>
                <Text>{this.state.latitude}</Text>

            </View>
        )
    }
}