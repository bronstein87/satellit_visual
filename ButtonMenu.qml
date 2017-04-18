import QtQuick 2.0
import QtQuick.Controls 1.4
Button
{
    id: menuButton
    width: 50
    height: 50
    onHoveredChanged: function()
    {
        if(hovered)
        {
            opacity = 1;
        }
        else
        {
            opacity = 0.5;
        }
    }
}
