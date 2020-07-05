import Vue from "vue";

Vue.prototype.$azureUpload = async (config, httpHandler) => {
  const $log = (string) => console.log(string);
  const $http = httpHandler;
  const DefaultBlockSize = 1024 * 32; // Default to 32KB
  let outsideResolve;

  const upload = () => {
    return new Promise((resolve, reject) => {
      outsideResolve = resolve;
      const state = initializeState();
      const reader = new FileReader();

      reader.onloadend = async (evt) => {
        try {
          if (!state.cancelled) {
            const uri =
              state.fileUrl +
              "&comp=block&blockid=" +
              state.blockIds[state.blockIds.length - 1];
            const requestData = new Uint8Array(evt.target.result);

            $http.setHeader(
              "Access-Control-Allow-Origin",
              "http://localhost:3000"
            );
            $http.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");

            const response = await $http.put(uri, requestData, {
              transformRequest: []
            });

            $log(response.status);
            state.bytesUploaded += requestData.length;

            const percentComplete = (
              (parseFloat(state.bytesUploaded) / parseFloat(state.file.size)) *
              100
            ).toFixed(2);
            if (state.progress)
              state.progress(
                percentComplete,
                response.data,
                response.status,
                response.headers,
                response.config
              );

            uploadFileInBlocks(reader, state);
          }
        } catch (err) {
          $log(err.data);
          $log(err.status);

          if (state.error) {
            state.error(err.data, err.status, err.headers, err.config);
          }
        }
      };
      reader.onerror = reject;

      uploadFileInBlocks(reader, state);

      return {
        cancel() {
          state.cancelled = true;
        }
      };
    });
  };

  const initializeState = () => {
    let blockSize = DefaultBlockSize;
    if (config.blockSize) {
      blockSize = config.blockSize;
    }
    let maxBlockSize = blockSize;
    let numberOfBlocks = 1;

    const file = config.file;

    const fileSize = file.size;
    if (fileSize < blockSize) {
      maxBlockSize = fileSize;
      $log("max block size = " + maxBlockSize);
    }

    if (fileSize % maxBlockSize === 0) {
      numberOfBlocks = fileSize / maxBlockSize;
    } else {
      numberOfBlocks = parseInt(fileSize / maxBlockSize, 10) + 1;
    }

    $log("total blocks = " + numberOfBlocks);

    return {
      maxBlockSize,
      numberOfBlocks,
      totalBytesRemaining: fileSize,
      currentFilePointer: 0,
      blockIds: [],
      blockIdPrefix: "block-",
      bytesUploaded: 0,
      submitUri: null,
      file,
      baseUrl: config.baseUrl,
      sasToken: config.sasToken,
      fileUrl: config.baseUrl + config.sasToken,
      progress: config.progress,
      complete: config.complete,
      error: config.error,
      cancelled: false
    };
  };

  const uploadFileInBlocks = (reader, state) => {
    if (!state.cancelled) {
      if (state.totalBytesRemaining > 0) {
        const fileContent = state.file.slice(
          state.currentFilePointer,
          state.currentFilePointer + state.maxBlockSize
        );
        const blockId = state.blockIdPrefix + pad(state.blockIds.length, 6);

        state.blockIds.push(btoa(blockId));
        reader.readAsArrayBuffer(fileContent);

        state.currentFilePointer += state.maxBlockSize;
        state.totalBytesRemaining -= state.maxBlockSize;
        if (state.totalBytesRemaining < state.maxBlockSize) {
          state.maxBlockSize = state.totalBytesRemaining;
        }
      } else {
        commitBlockList(state);
      }
    }
  };

  const commitBlockList = async (state) => {
    const uri = state.fileUrl + "&comp=blocklist";

    let requestBody = '<?xml version="1.0" encoding="utf-8"?><BlockList>';
    for (let i = 0; i < state.blockIds.length; i++) {
      requestBody += "<Latest>" + state.blockIds[i] + "</Latest>";
    }
    requestBody += "</BlockList>";

    $http.setHeader("x-ms-blob-content-type", state.file.type);
    try {
      const response = await $http.put(uri, requestBody);
      $log(response.data);
      $log(response.status);
      if (state.complete) {
        outsideResolve();
        state.complete(
          response.data,
          response.status,
          response.headers,
          response.config
        );
      }
    } catch (error) {
      $log(error.data);
      $log(error.status);
      if (state.error) {
        state.error(error.data, error.status, error.headers, error.config);
      }
    }
  };

  const pad = (number, length) => {
    let str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }
    return str;
  };

  return await upload();
};
