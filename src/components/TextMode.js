import $ from 'jquery';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editStadium, editStadiumText } from '../reducers/stadiumSlice';
import { setMainMode } from '../reducers/mainModeSlice';

function TextMode() {

  const stadium = useSelector((state) => state.stadium.value);
  const stadiumText = useSelector((state) => state.stadium.toText);
  const dispatch = useDispatch();
  const mainMode = useSelector((state) => state.mainMode.value)

  var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var meta = {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
  };

  function quote(string) {
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' +
      string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c
          : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + string + '"';
  }

  function indent(l, b) {
    return l === 0 ? "\n" : l == 1 ? "\n\n\t" : l == 2 && !b ? "\n\t\t" : l == 3 || b ? " " : "";
  }

  var type_properties = {
    vertexes: ['x', 'y', 'bCoef', 'cMask', 'cGroup', 'trait'],
    segments: ['v0', 'v1', 'curve', 'vis', 'color', 'bCoef', 'cMask', 'cGroup', 'trait', 'bias'],
    planes: ['normal', 'dist', 'bCoef', 'cMask', 'cGroup', 'trait'],
    discs: ['radius', 'invMass', 'pos', 'color', 'bCoef', 'cMask', 'cGroup', 'trait', 'damping', 'speed', 'gravity'],
    goals: ['p0', 'p1', 'team'],
    joints: ['d0', 'd1', '_length', 'strength', 'color']
  };

  function order_keys(parent, keys) {
    var order = type_properties[parent];
    if (!order) {
      return keys
    }
    var okeys = [];
    $.each(order, function (i, k) {
      if ($.inArray(k, keys) != -1) {
        okeys.push(k);
      }
    });
    $.each(keys, function (i, k) {
      if ($.inArray(k, order) == -1) {
        okeys.push(k);
      }
    });
    return okeys;
  }

  function pprint(j, l, tag, parent) {
    if (!l) l = 0;
    if (parent == "length" && j == null) return j;
    if (parent == "canBeStored") {
      if (j == "true" || j == true) return true;
      else return false;
    }
    if (j.substr) {
      return quote(j);
    } else if (typeof j == 'number') {
      return j.toString();
    } else if (typeof j == 'boolean') {
      return j.toString();
    } else if (j instanceof Array) {
      l++;
      var trait = j[0] ? j[0].trait : "";
      var ret = "[" + indent(l);
      var first = true;

      $.each(j, function (i, x) {
        var d = "";
        if (x.trait != trait) {
          d = indent(l);
          trait = x.trait;
        }
        ret += (first ? "" : "," + d + indent(l)) + (tag ? "/* " + i + " */ " : "") + pprint(x, l, false, parent);
        first = false;
      });

      return ret + indent(l - 1) + "]";
    } else {
      l++;
      var ret = "{" + indent(l);
      var first = true;

      var keys = order_keys(parent, Object.keys(j));

      $.each(keys, function (i, k) {
        var v = j[k];
        if (v !== undefined && k != '_data') {
          var i = k == 'bg' ? 2 : l;
          ret += (first ? "" : "," + indent(l)) + quote(k) + " : " + pprint(v, i, k == 'vertexes' && i < 10, k);
          first = false;
        }
      });

      return ret + indent(l - 1, true) + "}";
    }
    return "JSON ERROR";
  }

  function handleFileLoad() {
    var plik = document.getElementById("loadHBS");
    var reader = new FileReader();
    reader.readAsBinaryString(plik.files[0]);
    reader.onload = function () {
      if (plik.value.endsWith(".hbs")) {
        const regex = /\/*.*\*\//
        const x = reader.result.split(regex);
        const y = x.join('');
        try {
          JSON.parse(y);
        } catch (error) {
          console.log(error)
          return alert("Incorrect file content - not a JSON Object")
        }
        dispatch(editStadium(JSON.parse(y)));
        dispatch(editStadiumText(pprint(JSON.parse(y))));
      } else {
        alert('Incorrect extension, file name should end with .hbs');
      }
    }
  }

  var defaultStadium = {
    name: "New Stadium",
    width: 420,
    height: 200,
    cameraWidth: 0,
    cameraHeight: 0,
    maxViewWidth: 0,
    cameraFollow: "ball",
    spawnDistance: 170,
    redSpawnPoints: [],
    blueSpawnPoints: [],
    canBeStored: true,
    kickOffReset: "partial",
    bg: { "color": "718C5A" },
    traits: {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    },
    vertexes: [],
    segments: [],
    goals: [],
    discs: [],
    planes: [],
    joints: [],
    "playerPhysics": {
      "radius": 15,
      "bCoef": 0.5,
      "invMass": 0.5,
      "damping": 0.96,
      "cGroup": ["red", "blue"],
      "acceleration": 0.1,
      "gravity": [0, 0],
      "kickingAcceleration": 0.07,
      "kickingDamping": 0.96,
      "kickStrength": 5,
      "kickback": 0,
    },
    "ballPhysics": {
      "radius": 10,
      "bCoef": 0.5,
      "cMask": ["all"],
      "damping": 0.99,
      "invMass": 1,
      "gravity": [0, 0],
      "color": "ffffff",
      "cGroup": ["ball"]
    }
  }

  function handleClick(e) {
    if (e.target.id === 'button_import_import') {
      var st;
      try {
        // JSON.parse(props.stadiumText);
        st = eval('[' + stadiumText + ']')[0];
      } catch (error) {
        st = 0;
      }
      if (st === 0) {
        alert('Can not load changes - text is not a proper JSON Object. Please fix errors or click button Cancel Changes');
        return;
      }
      // st = JSON.parse(props.stadiumText);
      if (st === undefined) {
        alert('Can not load changes - text is not a proper JSON Object. Please fix errors or click button Cancel Changes');
        return;
      }
      if (st.joints) {
        for (var i = 0; i < st.joints.length; i++) {
          if (st.joints[i]._length) {
            st.joints[i].length = st.joints[i]._length;
          }
        }
      }
      if (st.discs) {
        for (var i = 0; i < st.discs.length; i++) {
          if (st.discs[i].pos === undefined) st.discs[i].pos = [0, 0];
        }
      }
      $("#box").fadeTo(300, 0.01, "linear", function () {
        dispatch(editStadium(st));
        dispatch(setMainMode('stadiumCreator'));
      })
    } else if (e.target.id === 'button_import_cancel') {
      dispatch(editStadiumText(pprint(stadium)));
    } else if (e.target.id === 'button_import_clear') {
      var detect_desn = window.confirm('Are you sure?');
      if (detect_desn) dispatch(editStadiumText(JSON.stringify(defaultStadium)));
      else return false;
    } else if (e.target.id === 'button_import_select_all') {
      const el = document.createElement('textarea');
      el.value = stadiumText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      
      const btn = document.getElementById("button_import_select_all");
      btn.innerHTML = "COPIED!";
      setTimeout(function () {
        btn.innerHTML = "Copy All";
      }, 2000);
    } else if (e.target.id == 'button_downloadMap') {
      var stadiumToCopy = JSON.parse(JSON.stringify(stadium));
      for (let joint of stadiumToCopy.joints) if (joint.length == "null") joint.length = null;
      if (stadiumToCopy.canBeStored == "true" || stadiumToCopy.canBeStored == true) stadiumToCopy.canBeStored = true;
      else stadiumToCopy.canBeStored = false;
      var blob = new Blob([JSON.stringify(stadiumToCopy, null, "\t")], { type: 'text' });
      var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = stadiumToCopy.name + ".hbs";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (stadiumToCopy.canBeStored == true) stadiumToCopy.canBeStored = "true";
      else stadiumToCopy.canBeStored = "false";
      for (let joint of stadiumToCopy.joints) if (joint.length == null) joint.length = "null";
    }
  }

  useEffect(() => {
    if (mainMode === 'textMode') {
      dispatch(editStadiumText(pprint(stadium)));
      $("#box").fadeTo(300, 1);
    }
  }, [mainMode]);

  function handleChange(e) {
    dispatch(editStadiumText(e.target.value));
  }

  return (
    <div id="box" style={{ height: '84vh', opacity: 0.01 }} >
      <div id="boximport">
        <table style={{ height: '100%', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ height: '78vh' }}><textarea id="textarea_import" value={stadiumText} onChange={handleChange}></textarea></td>
            </tr>
            <tr>
              <td>
                <button id="button_import_import" onClick={handleClick}>
                  Save
                </button>
                <button id="button_import_cancel" onClick={handleClick}>
                  Cancel Changes
                </button>
                <button id="button_import_clear" onClick={handleClick}>
                  Clear
                </button>
                <button id="button_import_select_all" onClick={handleClick} style={{ backgroundColor: 'green' }}>
                  Copy All
                </button>
                <button id="button_downloadMap" onClick={handleClick} style={{ backgroundColor: 'green' }}>Download .hbs file</button>
                <label>{ }</label>
                <input type="file" id="loadHBS" onChange={handleFileLoad} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default TextMode;