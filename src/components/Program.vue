<template>
  <div>
    <div class="d-flex flex-row">
      <div id="option-pane" class="d-flex flex-column mb-6">
        <h1>Nodes</h1>
        <div class="drag-drawflow" v-on:click="select('if')">If</div>
        <div class="drag-drawflow" v-on:click="select('end_if')">End If</div>
        <div class="drag-drawflow" v-on:click="select('number')">Number</div>
        <div class="drag-drawflow" v-on:click="select('operation')">
          Arithmetic operation
        </div>
        <div class="drag-drawflow" v-on:click="select('assign')">
          Assign variable
        </div>

        <div class="drag-drawflow" v-on:click="select('use')">Use variable</div>
        <div class="drag-drawflow" v-on:click="select('print')">Print</div>
      </div>
      <div id="drawflow"></div>
    </div>

    <v-btn elevation="2" v-on:click="generateCode()">Parse code</v-btn>
    <v-textarea outlined name="input-7-4" v-model="textAreaCode"> </v-textarea>
  </div>
</template>
<script>
/*eslint-disable */
import * as Vue from "vue";
import Drawflow from "drawflow";
import styleDrawflow from "drawflow/dist/drawflow.min.css";
import { onMounted, shallowRef } from "vue";
import IfNode from "./nodes/IfNode.vue";
import StartNode from "./nodes/StartNode.vue";
import EndNode from "./nodes/EndNode.vue";
import AssignNode from "./nodes/AssignNode.vue";
import NumberNode from "./nodes/NumberNode.vue";
import OperationNode from "./nodes/OperationNode.vue";
import PrintNode from "./nodes/PrintNode.vue";
import EndIfNode from "./nodes/EndIfNode.vue";
import UseVariableNode from "./nodes/UseVariableNode.vue";

const editor = shallowRef({});
const data = [{}, {}];
var tabs = 0;
var code = "";
var visitedNodes = [];


export default {
  name: "drawflow",
  data: () => ({
    textAreaCode: "asdafsd",
  }),
  methods: {
    getConnections: function (node) {
      const connections = [];
      for (var input in node.inputs) {
        console.log("input: ", node.inputs[input]);
        if (node.inputs[input].connections.length > 0) {
          connections.push(parseInt(node.inputs[input].connections[0].node));
        }
      }
      return connections;
    },
    dfs: function (nodeId, visited) {
      if (visited[nodeId] == true) {
        return;
      }
      visited[nodeId] = true;
      const node = editor.value.getNodeFromId(nodeId);
      console.log(node);
      const connections = this.getConnections(node);

      console.log(connections);

      for (var i = 0; i < connections.length; i++) {
        console.log(connections);

        console.log(connections[i]);
        this.dfs(connections[i], visited);
      }
      console.log(this.handle(node));
    },
    handle: function (node) {
        console.log( "handling ", node.name);
        if(visitedNodes[node.id] == true){
            console.log("already visited this one");
            return;
        }
        visitedNodes[node.id] = true;
      const inputs = this.getConnections(node);
      if (node.name == "End") {
        console.log(this.handle(editor.value.getNodeFromId(inputs[0])));
      } else if (node.name == "If") {
        // console.log(data);
        const a = this.handle(editor.value.getNodeFromId(inputs[0]));
        const b = this.handle(editor.value.getNodeFromId(inputs[1]));

        var ans = "";
        for (var i = 0; i < tabs; i++) {
          ans += "    ";
        }

        ans += "if " + a + data[node.id].operation + b + ":\n";
        tabs += 1;
        code += ans;
      } else if (node.name == "Number") {
        return data[node.id].value;
      } else if (node.name == "UseVariable") {
        return data[data.length - 1].variable;
      } else if (node.name == "EndIf") {
        this.handle(editor.value.getNodeFromId(inputs[0]));
        var ans = "";
        for (var i = 0; i < tabs-1; i++) {
          ans += "    ";
        }

        ans += "else:\n";
        code += ans;
        this.handle(editor.value.getNodeFromId(inputs[1]));

        tabs -= 1;
        return "";
      } else if (node.name == "Operation") {
        const leftNode = editor.value.getNodeFromId(inputs[0]);
        const rightNode = editor.value.getNodeFromId(inputs[1]);
        var ans = "";
        ans +=
          this.handle(leftNode) +
          data[node.id].operation +
          this.handle(rightNode);
        //console.log("handling " + node.name +": "+ ans);

        return ans;
      } else if (node.name == "Assign") {
        var ans = "";
        for (var i = 0; i < tabs; i++) {
          ans += "    ";
        }
        const leftNode = editor.value.getNodeFromId(inputs[0]);
        const expression = this.handle(leftNode);
        ans += data[node.id].variable + " = " + expression;
        code += ans;
      } else if (node.name == "Print") {
        this.handle(editor.value.getNodeFromId(inputs[0]));
        var ans = "";
        for (var i = 0; i < tabs; i++) {
          ans += "\t";
        }
        ans += "println(" + data[node.id].message + ")\n";
        code += ans;
      }
    },
    generateCode: function () {
    code = "";
      console.log("generating");
      visitedNodes = [data.length];
      for (var i in visitedNodes) {
        i = false;
      }
      // this.dfs(1, visited);
      this.handle(editor.value.getNodeFromId(1));

      this.textAreaCode = code;
    },
    select: function (nodeType) {
      console.log(nodeType);

      if (nodeType == "if") {
        data.push({ operation: "<" });
        editor.value.addNode(
          "If",
          2,
          2,
          250,
          300,
          "Class",
          data[data.length - 1],
          "IfNode",
          "vue"
        );
      } else if (nodeType == "end_if") {
        data.push({});
        editor.value.addNode(
          "EndIf",
          2,
          1,
          250,
          300,
          "Class",
          data[data.length - 1],
          "EndIfNode",
          "vue"
        );
      } else if (nodeType == "number") {
        data.push({ value: "0" });
        editor.value.addNode(
          "Number",
          0,
          1,
          250,
          300,
          "Class",
          data[data.length - 1],
          "NumberNode",
          "vue"
        );
      } else if (nodeType == "operation") {
        data.push({ operation: "+" });

        editor.value.addNode(
          "Operation",
          2,
          1,
          250,
          300,
          "Class",
          data[data.length - 1],
          "OperationNode",
          "vue"
        );
      } else if (nodeType == "assign") {
        data.push({ variable: "" });
        editor.value.addNode(
          "Assign",
          1,
          1,
          250,
          300,
          "Class",
          data[data.length - 1],
          "AssignNode",
          "vue"
        );
      } else if (nodeType == "print") {
        data.push({ message: "" });
        editor.value.addNode(
          "Print",
          1,
          1,
          250,
          300,
          "Class",
          data[data.length - 1],
          "PrintNode",
          "vue"
        );
      } else if (nodeType == "use") {
        data.push({});
        editor.value.addNode(
          "UseVariable",
          1,
          1,
          250,
          300,
          "Class",
          {},
          "UseVariableNode",
          "vue"
        );
      }

      console.log(editor.value.getNodeFromId(1));
      console.log(data);
    },
  },
  setup() {
    const code = "";

    onMounted(() => {
      const id = document.getElementById("drawflow");
      editor.value = new Drawflow(id, Vue);
      editor.value.start();

      const props = {};
      const options = {};

      // Register nodes
      editor.value.registerNode("StartNode", StartNode, props, options);
      editor.value.registerNode("EndNode", EndNode, props, options);
      editor.value.registerNode("IfNode", IfNode, props, options);
      editor.value.registerNode("OperationNode", OperationNode, props, options);
      editor.value.registerNode("NumberNode", NumberNode, props, options);
      editor.value.registerNode("AssignNode", AssignNode, props, options);
      editor.value.registerNode("PrintNode", PrintNode, props, options);
      editor.value.registerNode("EndIfNode", EndIfNode, props, options);
      editor.value.registerNode("UseVariableNode", UseVariableNode, props, options);


      editor.value.registerNode(
        "AssignVariableNode",
        UseVariableNode,
        props,
        options
      );

      // add initial nodes
      /*editor.value.addNode(
        "Start",
        0,
        1,
        150,
        300,
        "Class",
        {},
        "StartNode",
        "vue"
      );*/
      editor.value.addNode(
        "End",
        1,
        0,
        850,
        300,
        "Class",
        {},
        "EndNode",
        "vue"
      );

      editor.value.on("connectionCreated", function (info) {
        console.log(
          "Connection createden " + info.output_id + "and " + info.input_id
        );
      });
    });
  },
};
/*eslint-enable */
</script>
<style scoped>
#drawflow {
  width: 80%;
  height: 500px;
  border: 1px solid red;
  text-align: initial;
}

#option-pane {
  width: 20%;
  height: 500px;
  padding: 10px;
}

.drag-drawflow {
  line-height: 50px;
  border-bottom: 1px solid gray;
  padding-left: 20px;
  cursor: pointer;
  user-select: none;
}

/****************** */
</style>