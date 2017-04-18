function createSun(radius) {

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('/images/sunmap.jpg');
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(commonGeometry, material);
    mesh.scale.set(radius, radius, radius);

    mesh.receiveShadow = false;
    mesh.castShadow = false;

    var sun = new THREE.Object3D();
    sun.add(mesh);
    var light = new THREE.PointLight(0x777777, 1)
    sun.add(light);

    return sun;
}


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
                                                   map: textureLoader.load('/images/earthcloudmapcolortrans.png'),
                                                   side: THREE.BackSide,
                                                   transparent: true,
                                                   opacity: 0.8
                                               });
    var mesh = new THREE.Mesh(commonGeometry, material);

    mesh.scale.set(1.02, 1.02, 1.02);
    earthMesh.add(mesh);

    var material2 = new THREE.MeshPhongMaterial({
                                                   map: textureLoader.load('/images/earthcloudmapcolortrans.png'),
                                                   side: THREE.FrontSide,
                                                   transparent: true,
                                                   opacity: 0.8
                                               });
    var mesh2 = new THREE.Mesh(commonGeometry, material2);


    mesh2.scale.set(1.02, 1.02, 1.02);
    earthMesh.add(mesh2);
}



function createStarfield(radius) {

    var texture	= new THREE.TextureLoader().load('/images/galaxy_starfield.png')
    var material	= new THREE.MeshBasicMaterial({
        map	: texture,
        side	: THREE.BackSide
    })
    var geometry	= new THREE.SphereGeometry(radius, 32, 32)
    var mesh	= new THREE.Mesh(geometry, material)
    return mesh
}
