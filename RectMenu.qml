import QtQuick 2.0

Rectangle
{
    id: rectMenu
    width: 300
    height: 250
    antialiasing: true
    border.width: 3
    border.color: "white"
    opacity: 0.8
    radius: 10


    Behavior on opacity {PropertyAnimation {}}

    MouseArea {
        drag.target: rectMenu
        drag.axis: Drag.XAndYAxis

        hoverEnabled: true
        anchors.fill: parent
        onEntered:  { parent.opacity = 0.8 }
        onExited:  { parent.opacity = 0.5/*function()*/
//        {
//             console.log(parent.contains(Qt.point(mouseX,mouseY)));
//            if(!parent.contains(Qt.point(mouseX,mouseY)))
//            {
//                console.log(parent.contains(Qt.point(mouseX,mouseY)));
//                parent.opacity = 0.3;
//            }

//        }
        }
    }

    color: "black"
}
