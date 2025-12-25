public class ChessBishop extends ChessPiece {

    private static final String TYPE = "BISHOP";

    public ChessBishop(char clr, int r, int c) {
        super(clr, r, c); // Καλώ τον Constructor της ChessPiece
    }

    // Έλεγχος αν η κίνηση είναι νόμιμη για τον BISHOP - διαγώνια κίνηση

    public boolean validDestination(int targetRow, int targetColumn) {
        int rowDiff = Math.abs(targetRow - row);
        int columnDiff = Math.abs(targetColumn - column);

        if (rowDiff == columnDiff) {
            System.out.println("Η κίνηση είναι έγκυρη");
            return true;
        } else {
            System.out.println("Η κίνηση Δεν είναι έγκυρη");
            return false;
        }
    }

    public String toString() {
        return "" + color + "BISHOP";
    }
}
