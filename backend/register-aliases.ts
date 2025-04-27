import moduleAlias from "module-alias";
import path from "path";

// Register the @/ alias for backend directory
moduleAlias.addAliases({
  "@": path.join(__dirname, "/")
});
