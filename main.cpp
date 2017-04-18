#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QList>
#include <QVariantList>
#include <QDebug>

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    engine.load(QUrl(QStringLiteral("qrc:/main.qml")));
    QList<QVariant> list1;
    list1<<1<<2<<3;
    QList<QVariant> list2;
    list2<<4.2<<5.1<<6.5;
    QVariantList vList;
    vList<<QVariant(list1)<<QVariant(list2);
    for(auto&i:engine.rootObjects())
    {
        qDebug()<<i->staticMetaObject.className();
    }
  QMetaObject::invokeMethod(engine.rootObjects().first(), "readValues",
           Q_ARG(QVariant, QVariant::fromValue(vList)));

    return app.exec();
}
