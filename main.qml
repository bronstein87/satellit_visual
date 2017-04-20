import QtQuick 2.4
import QtCanvas3D 1.1
import QtQuick.Window 2.2
import QtQuick.Controls 1.4

import "glcode.js" as GLCode

Window {
    title: qsTr("satellitvisual")
    width: 1280
    height: 768
    visible: true
    id:mainwindow

    function readValues(array)
    {
        for(var i=0; i<array.length; i++)
        {
            for(var j=0; j<array[i].length; j++)
            {
                console.log(array[i][j]);
            }
        }

    }

    Timer
    {
        id: timer;
        interval: 500; running: false; repeat: true
        onTriggered: console.log("qq")
    }


    Canvas3D {
        id: canvas3d
        anchors.fill: parent
        focus: true

        onInitializeGL: {
            GLCode.initializeGL(canvas3d,eventSource,timer);
        }

        onPaintGL: {
            GLCode.paintGL(canvas3d);
        }

        onResizeGL: {
            GLCode.resizeGL(canvas3d);


        }
        ControlEventSource {
            anchors.fill: parent
            focus: true
            id: eventSource
        }

    }


    RectMenu
    {
        id: menu

        Text
        {
            id:  dateTimeTextPar
            text: "Дата|Время: "
            color : "white"
            font.pixelSize: 16
            x: 10
            y: 10
        }

        Text
        {
            id : dateTimeText
            anchors.left: dateTimeTextPar.right
        }
        GroupBox
        {
            id: animParagraph
            flat:true
            anchors.top: dateTimeTextPar.bottom

            Text
            {
                id: animText
                text: "Анимация движения:"
                color: "white"
                font.pixelSize: 14

            }
            Switch
            {
                id: animSwitch
                anchors.left: animText.right
                anchors.leftMargin: 15
                onClicked: function(){
                    if (animSwitch.checked == true)
                    {
                        playButton.enabled = true;
                        stopButton.enabled =true;
                        manualSwitch.enabled = false;
                    }
                    else
                    {
                        playButton.enabled = false;
                        stopButton.enabled = false;
                        manualSwitch.enabled = true;
                    }
                }
            }

            Text
            {
                id:timerText
                anchors.top:animText.bottom
                color: "white"
                font.pixelSize:  14
                text:"Интервал таймера, мс: "
                anchors.topMargin: 5
            }


            TextField
            {
                id: timerTextField
                anchors.top:animSwitch.bottom
                anchors.left:timerText.right
                anchors.topMargin: 5

            }
            ButtonMenu
            {

                id : playButton
                enabled: false
                anchors.top:timerText.bottom
                anchors.topMargin: 5
                iconSource: "qrc:/images/1492533893_play.png"

            }
            ButtonMenu
            {
                id: stopButton
                enabled: false
                anchors.left:playButton.right
                anchors.top:timerText.bottom
                anchors.topMargin: 5
                anchors.leftMargin: 40
                iconSource: "qrc:/images/1492534016_pause.png"

            }
        }

        GroupBox
        {
            id : manualCtrlParagraph
            flat:true
            anchors.top: animParagraph.bottom

            Text
            {
                id: manualText
                text: "Ручное управление:"
                color: "white"
                font.pixelSize: 14

            }

            Switch
            {
                id: manualSwitch
                anchors.left: manualText.right
                anchors.leftMargin: 15
                onClicked: function(){
                    if (manualSwitch.checked == true)
                    {
                        nextButton.enabled = true;
                        previousButton.enabled =true;
                        animSwitch.enabled = false;
                    }
                    else
                    {
                        nextButton.enabled = false;
                        previousButton.enabled = false;
                        animSwitch.enabled = true;
                    }
                }
            }

            ButtonMenu
            {
                id : previousButton
                enabled: false
                anchors.top:manualSwitch.bottom
                anchors.topMargin: 5
                iconSource: "qrc:/images/1492533920_arrow_left.png"

            }

            TextField
            {
                id : currentPosTextField
                width:  100
                height: 50
                font.pixelSize: 20
                validator: IntValidator {bottom: 0; top: 1000000}
                anchors.top:manualSwitch.bottom
                anchors.topMargin: 5
                anchors.left: previousButton.right
                anchors.leftMargin: 5
            }

            ButtonMenu
            {
                id: nextButton
                enabled: false
                anchors.left:currentPosTextField.right
                anchors.leftMargin: 5
                anchors.top:manualSwitch.bottom
                anchors.topMargin: 5
                iconSource: "qrc:/images/1492533959_arrow_right.png"

            }
        }
    }

    Slider{
        id:speedSlider;
        minimumValue: 0;
        maximumValue: 1;
        stepSize: 0.05;
        value: 0.05;
        tickmarksEnabled: true;
        x:(mainwindow.width/2)-speedSlider.width/2;
        width: 500;
        onValueChanged:{
            speedInfo.text=value;
            GLCode.updateRotationSpeed(value);
        }


    }
    Text{

        id: speedInfo;
        color: "white";
        anchors.left: speedSlider.right;
    }



}


