Qt.include("three.js")


var commonGeometry = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(1, 64, 64));



function createPlanet(radius, bumpMapScale, mapTexture, bumpTexture, specularTexture) {

    var textureLoader = new THREE.TextureLoader();
    var material = new THREE.MeshPhongMaterial({
                                                   map: textureLoader.load(mapTexture),
                                                   bumpMap: textureLoader.load(bumpTexture),
                                                   bumpScale: bumpMapScale
                                               });

    if (specularTexture) {
        material.specularMap = textureLoader.load(specularTexture);
        material.specular = new THREE.Color('grey');
        material.shininess = 50.0;
    } else {
        material.shininess = 1.0;
    }

    var mesh = new THREE.Mesh(commonGeometry, material);
    mesh.scale.set(radius, radius, radius);

    return mesh;
}

function createEarthCloud(earthMesh) {

    var textureLoader = new THREE.TextureLoader();
    var material = new THREE.MeshPhongMaterial({
                                                   map: textureLoader.load('qrc:images/earthcloudmapcolortrans.png'),
                                                   side: THREE.BackSide,
                                                   transparent: true,
                                                   opacity: 0.8
                                               });
    var mesh = new THREE.Mesh(commonGeometry, material);

    var material2 = new THREE.MeshPhongMaterial({
                                                   map: textureLoader.load('qrc:images/earthcloudmapcolortrans.png'),
                                                   side: THREE.FrontSide,
                                                   transparent: true,
                                                   opacity: 0.8
                                               });
    var mesh2 = new THREE.Mesh(commonGeometry, material2);

    mesh.scale.set(1.02, 1.02, 1.02);
    earthMesh.add(mesh);
    mesh2.scale.set(1.02, 1.02, 1.02);
    earthMesh.add(mesh2);
}



function createStarfield(radius) {

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('qrc:/images/galaxy_starfield.png')
    var material = new THREE.MeshBasicMaterial({
                                                   map: texture,
                                                   side: THREE.BackSide
                                               })
    var geometry = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(radius, 32, 32));
    var mesh = new THREE.Mesh(geometry, material)

    return mesh

}
