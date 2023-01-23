SERVER_PUBLIC = "./server/public"
BUILD_LOCATION = "./client/build"

tasks:
  -- run
  run: =>
    fs.chdir "./server"
    sh "npm start"
  -- build
  build: =>
    -- Build react
    show "Building React app..."
    fs.chdir "./client"
    sh "npm run build"
    -- Copy to public dir
    show "Copying over to #{SERVER_PUBLIC}"
    fs.chdir ".."
    for node, typ in fs.dir BUILD_LOCATION
      newpath = ("./" .. node)\match "#{BUILD_LOCATION}/(.+)"
      print style "%{yellow} ~ #{node} (#{typ}) -> #{SERVER_PUBLIC}/#{newpath}"
      copy node, "#{SERVER_PUBLIC}/#{newpath}"
  -- clean
  clean: =>
    tasks.clean_client!
    tasks.clean_server!
  clean_client: =>
    print style "%{red} - client/build"
    delete BUILD_LOCATION
  clean_server: =>
    for node in fs.dir SERVER_PUBLIC
      print style "%{red} - #{node}"
      delete "./#{node}" 