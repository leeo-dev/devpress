<td>
                    <select id="ownerID" name="OwnerID" class="id" required>
                    <?php

$Employee_ID = '';

$sql1 = "SELECT Employee_ID FROM user1 WHERE Position1='QE' OR Position1='OTHER'";
$result1 = odbc_exec($conn, $sql1);?>
                    <option value="">Choose</option>
                    <?php while ($row1 = odbc_fetch_array($result1)) {
    $Employee_ID = $row1['Employee_ID'];
    ?>
                        <option value ="<?php echo $Employee_ID; ?>"><?php echo $Employee_ID; ?></option>
                    <?php
}
?>
                    </select>
                </td>
                </tr>
                <tr>
                <td id="response" style="margin-left:50px;">
                </td>