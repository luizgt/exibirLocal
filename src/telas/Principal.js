import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

import Estilos from '../css/Estilo'

export default class Principal extends Component {

    state = {
        latitude: 0,
        longitude: 0,
        acuracia: 0,
        altitude: 0,
        data: 0
    }

    async componentDidMount() {
        this.pegarLocalizacao;      // enquanto a localização for atualizada atualiza a renderizacao
    }

    // geolocation.watchPosition(success, [error], [options]);

    pegarLocalizacao() {       //busca as coordenadas para atualizar a posicao dos pontos
        var posAuxiliar;

        var dia = new Date().getDate();        //Current Date
        var mes = new Date().getMonth() + 1;  //Current Month
        var ano = new Date().getFullYear();    //Current Year
        var hora = new Date().getHours();      //Current Hours
        var minuto = new Date().getMinutes();      //Current Minutes
        var seg = new Date().getSeconds();      //Current Seconds

        // var date = dia + '/' + mes + '/' + ano;
        var date = hora + ':' + minuto + ':' + seg;

        Geolocation.getCurrentPosition(
            (pos) => {
                posAuxiliar = JSON.stringify(pos);
                posAuxiliar = JSON.parse(posAuxiliar);
                this.setState({
                    latitude: posAuxiliar.coords.latitude,
                    longitude: posAuxiliar.coords.longitude,
                    acuracia: posAuxiliar.coords.accuracy,
                    altitude: posAuxiliar.coords.altitude,
                    data: date,
                    error: null
                });
            },
            (error) => this.setState({ erro: error.message }),
            {
                enableHighAccuracy: false,    //alta precisao
                timeout: 20000,             //tempo para executar antes de retornar erro
                maximumAge: 1000
            },         //tempo permitido de cache do dispositivo
        );
    }

    enviarDados = async () => {
        await axios({
            method: 'post',
            url: 'http://192.168.137.1/TCON/Controllers/Map.php',
            data: {
                coords:{
                    lat: this.state.latitude,
                    lng: this.state.longitude
                },
                data: this.state.data
            }
        }).then(response => {
            console.warn(response.data)
        }).catch(err => {
            console.warn(err)
        })
        
        // axios({
        //     method: 'post',
        //     url: 'http://192.168.137.1/TCON/Controllers/Map.php',
        //     data:{
        //         weslley: 'é fodao',
        //     },
        // }).then(response => {
        //     console.warn(response)
        // }).catch(err => {
        //     console.warn(err)
        // })
    }

    render() {
        this.pegarLocalizacao();
        return (
            <View style={Estilos.Dados}>
                <Text style={Estilos.DadosTexto}>Latitude: {this.state.latitude}</Text>
                <Text style={Estilos.DadosTexto}>Longitude: {this.state.longitude}</Text>
                <Text style={Estilos.DadosTexto}>Acuracia: {this.state.acuracia}</Text>
                <Text style={Estilos.DadosTexto}>Altitude: {this.state.altitude}</Text>
                <Text style={Estilos.DadosTexto}>Data: {this.state.data}</Text>
                <TouchableOpacity onPress={this.enviarDados}>
                    <Text>Enviar Dados</Text>
                </TouchableOpacity>
            </View>
        )
    }
}